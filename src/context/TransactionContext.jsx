import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [expandedStage, setExpandedStage] = useState(null);
  const [expandedTransactions, setExpandedTransactions] = useState(new Set());

  const handleStageClick = (stageId) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);

    // Sync with transactions - when stage is clicked, update transactions
    const newExpanded = new Set(expandedTransactions);
    if (expandedStage === stageId) {
      newExpanded.delete(stageId);
    } else {
      newExpanded.add(stageId);
    }
    setExpandedTransactions(newExpanded);
  };

  const toggleTransaction = (id) => {
    // Only update transactions, don't sync with stages
    const newExpanded = new Set(expandedTransactions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTransactions(newExpanded);
  };

  return (
    <TransactionContext.Provider
      value={{
        expandedStage,
        expandedTransactions,
        handleStageClick,
        toggleTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
}
