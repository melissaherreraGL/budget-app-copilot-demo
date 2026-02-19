
interface MonthPickerProps {
  value: string; // "YYYY-MM"
  onChange: (value: string) => void;
}

export default function MonthPicker({ value, onChange }: MonthPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="month-picker"
        className="text-sm text-slate-500"
      >
        Mes
      </label>

      <input
        id="month-picker"
        name="month"
        data-testid="month-picker"
        aria-label="Seleccionar mes"
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition hover:bg-slate-50 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />
    </div>
  );
}
