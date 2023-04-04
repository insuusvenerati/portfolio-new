import Image from "remix-image";

type RemixImageProps = React.ComponentProps<typeof Image>;

export const RemixImage = ({ ...props }: RemixImageProps) => {
  return (
    <Image
      responsive={[
        {
          size: {
            width: 128,
            height: 128,
          },
          maxWidth: 200,
        },
      ]}
      loaderUrl="/api/image"
      dprVariants={[1, 3]}
      {...props}
    />
  );
};
