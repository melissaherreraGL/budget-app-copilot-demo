type Props = {
  value: string; // "YYYY-MM"
  onChange: (value: string) => void;
};

export default function MonthPicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-slate-200">Mes</label>
      <input
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-900 text-slate-100 border border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
      />
    </div>
  );
}
