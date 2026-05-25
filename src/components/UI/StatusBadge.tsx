type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s/g, "-");
  return <span className={`status-badge status-${normalized}`}>{status}</span>;
}
