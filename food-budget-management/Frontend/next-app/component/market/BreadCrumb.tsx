interface BreadcrumbProps {
  storeName: string;
  categoryName?: string;
}

export default function Breadcrumb({ storeName, categoryName }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#6b7f6d]">
      <span className={categoryName ? 'text-[#6b7f6d]' : 'text-[#7ec98a]'}>
        {storeName}
      </span>
      {categoryName && (
        <>
          <span className="opacity-50">›</span>
          <span className="text-[#7ec98a]">{categoryName}</span>
        </>
      )}
    </div>
  );
}