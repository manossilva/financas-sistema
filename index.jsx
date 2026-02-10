import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [transacoes, setTransacoes] = useState([
    { id: 1, descricao: "Salário", valor: 2000, tipo: "entrada" },
    { id: 2, descricao: "Aluguel", valor: 800, tipo: "saida" },
  ]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("saida");

  // Funções de negócio
  const totalEntradas = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalSaidas = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  const adicionarTransacao = (e) => {
    e.preventDefault();
    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      tipo,
    };
    setTransacoes((prev) => [...prev, novaTransacao]);
    setDescricao("");
    setValor("");
    setTipo("saida");
  };

  const excluirTransacao = (id) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
  };

  // JSX (interface)
  return (
    <div style={{ fontFamily: "Arial", padding: "1rem" }}>
      <header>
        <h1>Organizador Financeiro</h1>
      </header>

      {/* Dashboard de resumo */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          margin: "1rem 0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Resumo Financeiro</h2>
        <p>Entradas: R$ {totalEntradas.toFixed(2)}</p>
        <p>Saídas: R$ {totalSaidas.toFixed(2)}</p>
        <p>Saldo: R$ {saldo.toFixed(2)}</p>
      </div>

      {/* Formulário de lançamento */}
      <form
        onSubmit={adicionarTransacao}
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          margin: "1rem 0",
        }}
      >
        <h2>Adicionar Lançamento</h2>
        <div style={{ margin: "1rem 0" }}>
          <label style={{ display: "block" }}>
            Descrição
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex.: mercado, salário"
              style={{ width: "100%", padding: "0.5rem" }}
              required
            />
          </label>
        </div>
        <div style={{ margin: "1rem 0" }}>
          <label style={{ display: "block" }}>
            Valor
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="R$ 0,00"
              style={{ width: "100%", padding: "0.5rem" }}
              required
            />
          </label>
        </div>
        <div style={{ margin: "1rem 0" }}>
          <label style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              name="tipo"
              value="entrada"
              checked={tipo === "entrada"}
              onChange={() => setTipo("entrada")}
            />{" "}
            Entrada
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="saida"
              checked={tipo === "saida"}
              onChange={() => setTipo("saida")}
            />{" "}
            Saída
          </label>
        </div>
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Adicionar
        </button>
      </form>

      {/* Histórico de lançamentos */}
      <div style={{ margin: "1rem 0" }}>
        <h2>Histórico de Lançamentos</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transacoes.map((t) => (
            <li
              key={t.id}
              style={{
                border: "1px solid #eee",
                padding: "0.5rem",
                margin: "0.2rem 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {t.descricao} - R$ {t.valor.toFixed(2)} ({t.tipo})
              </span>
              <button
                onClick={() => excluirTransacao(t.id)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "0.2rem 0.5rem",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Renderização no DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
