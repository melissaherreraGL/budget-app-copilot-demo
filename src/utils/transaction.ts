import type { Transaction } from "../types/transaction";

/**
 * Actualiza una transacción existente en el array
 * Mantiene immutabilidad del array
 * @param transactions - Array original de transacciones
 * @param updatedTransaction - Transacción con los cambios
 * @returns Nuevo array con la transacción actualizada
 */
export function updateTransaction(
  transactions: Transaction[],
  updatedTransaction: Transaction
): Transaction[] {
  return transactions.map((tx) =>
    tx.id === updatedTransaction.id ? updatedTransaction : tx
  );
}

/**
 * Elimina una transacción del array
 * @param transactions - Array original de transacciones
 * @param id - ID de la transacción a eliminar
 * @returns Nuevo array sin la transacción
 */
export function deleteTransaction(
  transactions: Transaction[],
  id: string
): Transaction[] {
  return transactions.filter((tx) => tx.id !== id);
}