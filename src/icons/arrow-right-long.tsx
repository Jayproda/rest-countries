import type { SVGProps } from "react";
interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  props?: SVGProps<SVGSVGElement>;
}

const ArrowRightLong = ({
  width = 30,
  height = 22,
  fill = "#000000",
  className,
  ...props
}: IProps) => (
  <svg
    width={30}
    height={22}
    viewBox="0 0 400 400"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M49 200.913C99.7842 198.157 150.377 196.78 200.778 196.78C276.38 196.78 336.003 200.913 351.598 200.913"
      stroke={fill}
      strokeOpacity={0.9}
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M297.858 148C311.416 151.811 342.206 190.498 350.385 194.54C358.564 198.581 323.305 244.831 307.119 253"
      stroke={fill}
      strokeOpacity={0.9}
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowRightLong;
