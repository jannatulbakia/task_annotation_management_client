interface Props {
  priority: "low" | "medium" | "high";
}

export default function PriorityBadge({ priority }: Props) {
  const styles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority.toUpperCase()}
    </span>
  );
}