// Formateo centralizado de moneda para Costa Rica (colones)
const crcFormatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  // CRC normalmente no usa decimales; si quieres decimales, cambia a 2.
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCRC(amount: number) {
  if (!Number.isFinite(amount)) return "₡0";
  return crcFormatter.format(amount);
}
