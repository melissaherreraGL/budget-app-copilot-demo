import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Transaction } from "../types/transaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Modal from "../components/Modal";
import { updateTransaction, deleteTransaction } from "../utils/transaction";


interface GastosPageProps {
  currentMonth: string;
}

export default function GastosPage({ currentMonth }: GastosPageProps) {
  const [allTransactions, setAllTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    []
  );

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("📊 GastosPage render:", { isModalOpen, editingTransaction: editingTransaction?.id || null });

  const monthKey = currentMonth.slice(0, 7);

  const monthTransactions = allTransactions.filter(
  (tx) => tx.date.slice(0, 7) === monthKey
);

  function handleAddTransaction(tx: Transaction) {
    console.log("➕ Agregar transacción:", tx);
    setAllTransactions([...allTransactions, tx]);
  }

  function handleUpdateTransaction(tx: Transaction) {
    console.log("✏️ Actualizar transacción:", tx);
    const updated = updateTransaction(allTransactions, tx);
    setAllTransactions(updated);
    setIsModalOpen(false);
    setEditingTransaction(null);
  }

  function handleDelete(id: string) {
    console.log("🗑️ Eliminar transacción:", id);
    const updated = deleteTransaction(allTransactions, id);
    setAllTransactions(updated);
  }

  function handleEdit(transaction: Transaction) {
    console.log("📝 handleEdit llamado con:", transaction);
    setEditingTransaction(transaction);
    setIsModalOpen(true);
    console.log("✅ Estados actualizados - isModalOpen debería ser true");
  }

  function handleCloseModal() {
    console.log("❌ Cerrar modal");
    setEditingTransaction(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Sección de Formulario - Crear Transacciones */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          ➕ Agregar Nueva Transacción
        </h3>

        <TransactionForm
          onAdd={handleAddTransaction}
          defaultDate={currentMonth}
          mode="create"
        />
      </div>

      {/* Sección de Listado */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          📋 Transacciones de {currentMonth}
          {monthTransactions.length > 0 && (
            <span className="ml-2 text-sm text-slate-500">
              ({monthTransactions.length})
            </span>
          )}
        </h3>

        {monthTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">
              No hay transacciones para este mes. ¡Crea una nueva!
            </p>
          </div>
        ) : (
          <TransactionList
            transactions={monthTransactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>

      {/* Modal para Editar */}
      <Modal
        open={isModalOpen}
        title="✏️ Editar Transacción"
        onClose={handleCloseModal}
      >
        {editingTransaction && (
          <TransactionForm
            onAdd={handleUpdateTransaction}
            defaultDate={editingTransaction.date}
            mode="edit"
            initialValue={editingTransaction}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
