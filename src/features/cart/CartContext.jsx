import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getProducts } from "../../services/productsService.js";

const STORAGE_KEY = "kamchin_cart_v1";

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object") return { items: {} };
    if (!parsed.items || typeof parsed.items !== "object") return { items: {} };
    return { items: parsed.items };
  } catch {
    return { items: {} };
  }
}

function safeSave(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  } catch {
    // ignore
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const id = String(action.id);
      const next = { ...state.items, [id]: (state.items[id] || 0) + 1 };
      return { ...state, items: next };
    }
    case "REMOVE_ONE": {
      const id = String(action.id);
      const cur = state.items[id] || 0;
      if (cur <= 1) {
        const next = { ...state.items };
        delete next[id];
        return { ...state, items: next };
      }
      return { ...state, items: { ...state.items, [id]: cur - 1 } };
    }
    case "SET_QTY": {
      const id = String(action.id);
      const qty = Math.max(0, Number(action.qty) || 0);
      const next = { ...state.items };
      if (qty === 0) delete next[id];
      else next[id] = qty;
      return { ...state, items: next };
    }
    case "CLEAR":
      return { items: {} };
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, safeLoad);
  const [productsMap, setProductsMap] = useState(() => new Map());

  useEffect(() => {
    safeSave(state);
  }, [state]);

  useEffect(() => {
    let alive = true;
    getProducts().then((list) => {
      if (!alive) return;
      const m = new Map();
      (Array.isArray(list) ? list : []).forEach((p) => {
        if (p?.id) m.set(String(p.id), p);
      });
      setProductsMap(m);
    });
    return () => {
      alive = false;
    };
  }, []);

  const count = useMemo(() => Object.values(state.items).reduce((a, b) => a + (Number(b) || 0), 0), [state.items]);

  const lines = useMemo(() => {
    const out = [];
    for (const [id, qty] of Object.entries(state.items)) {
      const product = productsMap.get(String(id)) || null;
      out.push({ id: String(id), qty: Number(qty) || 0, product });
    }
    return out.filter((x) => x.qty > 0);
  }, [state.items, productsMap]);

  const api = useMemo(
    () => ({
      add: (id) => dispatch({ type: "ADD", id }),
      removeOne: (id) => dispatch({ type: "REMOVE_ONE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      count,
      lines,
    }),
    [count, lines]
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
