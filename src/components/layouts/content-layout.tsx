import { type ReactNode } from "react";

type ContentLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title = "" }: ContentLayoutProps) => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8">
        {children}
      </div>
    </div>
  );
};
