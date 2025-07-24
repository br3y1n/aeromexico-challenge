import { InputHTMLAttributes, ReactNode, SVGAttributes } from "react";

interface PrevInputProps {
  classNames?: {
    container?: string;
    input?: string;
  };
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  renderLeftIcon?: (props: SVGAttributes<SVGElement>) => ReactNode;
  renderRightIcon?: (props: SVGAttributes<SVGElement>) => ReactNode;
}

type InputProps = PrevInputProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "className" | "size" | "onBlur"
  >;

export type { InputProps };
