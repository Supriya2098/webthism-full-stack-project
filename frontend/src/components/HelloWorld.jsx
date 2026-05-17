import { useEffect, useState } from "react";
import { fetchHello } from "../api.js";

export default function HelloWorld() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHello = async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetchHello());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHello();
  }, []);

  return (
    <section className="card">
      <h2>API Response</h2>
      <p className="hint">
        React uses <code>fetch</code> → <code>GET /api/hello</code> on Express.
      </p>

      {loading && <p className="status loading">Connecting to backend…</p>}

      {error && (
        <div className="status error" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="result">
          <p className="message">{data.message}</p>
          <dl>
            <div>
              <dt>Project</dt>
              <dd>{data.student}</dd>
            </div>
            <div>
              <dt>Timestamp</dt>
              <dd>{new Date(data.timestamp).toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      )}

      <button type="button" className="btn" onClick={loadHello}>
        Refresh
      </button>
    </section>
  );
}
