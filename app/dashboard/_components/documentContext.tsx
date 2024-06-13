import { createContext, useContext } from "react";

interface DocumentContextType {
  documentType: "user" | "org";
  orgId: string;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentContext must be used within a DocumentProvider");
  }
  return context;
};

interface DocumentProviderProps {
  documentType: "user" | "org";
  orgId: string;
  children: React.ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({
  documentType,
  orgId,
  children,
}) => {
  return (
    <DocumentContext.Provider value={{ documentType, orgId }}>
      {children}
    </DocumentContext.Provider>
  );
};