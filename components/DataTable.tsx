type DataTableProps = {
  children: React.ReactNode;
  className?: string;
};

export function DataTable({ children, className = "" }: DataTableProps) {
  return (
    <div className={`overflow-hidden rounded-md border border-line bg-white shadow-soft ${className}`}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
