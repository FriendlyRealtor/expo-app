export type SearchProps = {
  data: any;
  label?: string | React.ReactNode;
  onSelectionChange?: (item: any) => void;
  resetQuery?: boolean;
  placeholder?: string;
  filterKeys?: string[];
};
