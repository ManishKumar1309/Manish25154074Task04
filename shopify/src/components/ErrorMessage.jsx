export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box">
      <div className="state-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}