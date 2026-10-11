import { Link } from "react-router-dom";

export default function EmptyState({
  icon = "📭",
  title,
  text,
  actionText,
  actionTo,
}) {
  return (
    <div className="state-box">
      <div className="state-icon">{icon}</div>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {actionText && actionTo && (
        <Link to={actionTo} className="btn">
          {actionText}
        </Link>
      )}
    </div>
  );
}