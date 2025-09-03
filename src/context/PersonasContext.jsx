import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const PersonasContext = createContext();

export function PersonasProvider({ children }) {
  const [personas, setPersonas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🔹 Escuchar cambios en tiempo real desde Firestore
  useEffect(() => {
    const q = query(collection(db, "personas"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPersonas(data);
        setCargando(false);
      },
      (error) => {
        console.error("Error al cargar:", error);
        toast.error("Error al cargar datos de Firebase");
        setCargando(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // 🔹 Agregar persona
  const addPersona = useCallback(async (persona) => {
    try {
      const datosLimpios = Object.fromEntries(
        Object.entries(persona).filter(([_, v]) => v !== undefined)
      );

      const fecha = persona.fecha
        ? Timestamp.fromDate(new Date(persona.fecha))
        : Timestamp.now();

      const nuevoDoc = await addDoc(collection(db, "personas"), {
        ...datosLimpios,
        fecha,
      });

      setPersonas((prev) => [
        { id: nuevoDoc.id, ...datosLimpios, fecha },
        ...prev, // insertamos al inicio porque ordenamos desc
      ]);

      toast.success("Persona agregada");
    } catch (error) {
      console.error("Error al agregar:", error);
      toast.error("Error al agregar persona");
    }
  }, []);

  // 🔹 Actualizar persona
  const updatePersona = useCallback(async (personaEditada) => {
    try {
      const { id, ...resto } = personaEditada;

      const datosLimpios = Object.fromEntries(
        Object.entries(resto).filter(([_, v]) => v !== undefined)
      );

      datosLimpios.fecha = resto.fecha
        ? (resto.fecha.toDate ? resto.fecha : Timestamp.fromDate(new Date(resto.fecha)))
        : Timestamp.now();

      const docRef = doc(db, "personas", id);
      await updateDoc(docRef, datosLimpios);

      setPersonas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...datosLimpios } : p))
      );

      toast.success("Persona actualizada");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error("Error al actualizar persona");
    }
  }, []);

  // 🔹 Eliminar persona
  const deletePersona = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "personas", id));
      setPersonas((prev) => prev.filter((p) => p.id !== id));
      toast.info("Persona eliminada");
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar persona");
    }
  }, []);

  return (
    <PersonasContext.Provider
      value={{
        personas,
        cargando,
        addPersona,
        updatePersona,
        deletePersona,
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
}

export function usePersonas() {
  const context = useContext(PersonasContext);
  if (!context) throw new Error("usePersonas debe usarse dentro de PersonasProvider");
  return context;
}
