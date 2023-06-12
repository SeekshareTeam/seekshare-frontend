import * as React from 'react';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import { Maybe } from 'src/generated/types';

const colors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
];

type ColorPair = {
  primary: string;

  secondary: string;
};

function getRandomColorPair(): ColorPair {
  const colorPrimary = colors[Math.floor(Math.random() * colors.length)];
  let colorSecondary = colors[Math.floor(Math.random() * colors.length)];
  while (colorSecondary === colorPrimary) {
    colorSecondary = colors[Math.floor(Math.random() * colors.length)];
  }

  return { primary: colorPrimary, secondary: colorSecondary };
}

type AvatarConfig = {
  blocksPerEdge: number;

  padding: number;

  spacing: number;

  color: ColorPair;
};

const generateBlockOptions = (config: Partial<AvatarConfig>): AvatarConfig => {
  const options: AvatarConfig = {
    blocksPerEdge: Math.max(config.blocksPerEdge || 5, 3),
    padding: config.padding || 20,
    spacing: config.spacing || 0,
    color: config?.color || getRandomColorPair(),
  };

  return options;
};

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawRect(
  ctx: CanvasRenderingContext2D,
  color: string,
  coords: number[],
  squareWidth: number,
  squareHeight: number,
  xPadding: number,
  yPadding: number
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  const startX = xPadding + coords[0] * squareWidth;
  const startY = yPadding + coords[1] * squareHeight;

  ctx.rect(startX, startY, squareWidth, squareHeight);
  ctx.fill();
  ctx.closePath();
}

export type LogoType = 'canvas' | 'image' | 'color';

interface Props {
  height?: number;
  width?: number;
  displayHeight?: string;
  displayWidth?: string;
  type: LogoType;
  imgUrl?: Maybe<string>;
  className?: string;
  loading?: boolean;
}

type AvatarRef = {
  onChangeCanvas: () => void;
  toBlob: (fileName: string) => void;
};

const Avatar = React.forwardRef<AvatarRef, Props>(
  (
    {
      height = 150,
      width = 150,
      displayHeight = 'h-36',
      displayWidth = 'w-36',
      className = undefined,
      imgUrl = undefined,
      loading = false,
      type = 'color',
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const mutateCanvas = (canvasEl: HTMLCanvasElement) => {
      // const canvasEl: HTMLCanvasElement = canvasRef.current;
      const options = generateBlockOptions({ blocksPerEdge: 5 });
      // canvasEl.style.background = options.color.primary;

      const context = canvasEl.getContext('2d');

      if (context) {
        context.fillStyle = options.color.primary;
        context.fillRect(0, 0, canvasEl.width, canvasEl.height);
        context.drawImage(canvasEl, 0, 0);

        const boxHeight = canvasEl.height - 2 * options.padding;
        const boxWidth = canvasEl.width - 2 * options.padding;

        const squareUnitHeight = boxHeight / options.blocksPerEdge;
        const squareUnitWidth = boxWidth / options.blocksPerEdge;

        const numOfBlocksToColor = getRandomInt(
          options.blocksPerEdge,
          options.blocksPerEdge * options.blocksPerEdge -
            (options.blocksPerEdge - 1)
        );

        const coordinatePool = [];

        for (let i = 0; i < options.blocksPerEdge; i++) {
          for (let j = 0; j < options.blocksPerEdge; j++) {
            coordinatePool.push([i, j]);
          }
        }

        shuffleArray(coordinatePool);
        let coords;

        for (let iter = 0; iter < coordinatePool.length; iter++) {
          coords = coordinatePool[iter];

          let color = options.color.primary;
          if (iter >= numOfBlocksToColor) {
            color = options.color.secondary;
          }

          if (context) {
            drawRect(
              context,
              color,
              coords,
              squareUnitHeight,
              squareUnitWidth,
              options.padding,
              options.padding
            );
          }
        }
      }
    };

    React.useEffect(() => {
      /**
       * Steps to reproduce
       * First create the canvas height and width
       * Get the primary and secondary colors
       * Select the number of blocks to replace
       * Select the location of blocks to replace
       * Color the blocks
       */
      if (canvasRef.current) {
        mutateCanvas(canvasRef.current);
        if (ref) {
          (ref as React.MutableRefObject<AvatarRef>).current = {
            onChangeCanvas: () => {
              if (canvasRef?.current) {
                mutateCanvas(canvasRef.current);
              }
            },
            toBlob: async (fileName: string) => {
              if (canvasRef?.current) {
                await canvasRef.current.toBlob(async function (blob) {
                  if (blob) {
                    const formData = new FormData();
                    formData.append('file_name', fileName);
                    formData.append('workspace_image', blob);

                    await axios({
                      method: 'post',
                      headers: {
                        Accept: 'application/json',
                        'Content-type': 'multipart/form-data',
                      },
                      url: process.env.NEXT_PUBLIC_IMAGE_UPLOAD,
                      data: formData,
                    });
                  }
                });
              }
            },
          };
        }
      }
    }, []);

    const renderAvatar = () => {
      switch (type) {
        case 'image':
          return (
            <img
              className={`rounded-lg ${displayHeight} ${displayWidth}`}
              src={imgUrl || undefined}
            />
          );
        case 'canvas':
          return (
            <canvas
              className={`rounded-lg ${displayHeight} ${displayWidth}`}
              height={height}
              width={width}
              ref={(node) => {
                canvasRef.current = node;
              }}
            />
          );
        case 'color':
          return (
            <div className={`rounded-lg ${displayHeight} ${displayWidth} ${imgUrl}`} />
          )
        default:
          return null;
      }
    };

    const renderAvatarWithLoading = (loading: boolean | undefined) => {
      if (loading) {
        return (
          <ContentLoader
            className="rounded-lg"
            width={width}
            height={height}
            viewBox="0 0 200 200"
          >
            <rect x="0" y="0" width="100%" height="100%" />
          </ContentLoader>
        );
      } else {
        return renderAvatar();
      }
    };

    return (
      <div
        className={`inline-block m-auto rounded-lg shadow-xl ${
          !loading ? 'bg-yellow-100' : ''
        } ${className}`}
      >
        {renderAvatarWithLoading(loading)}
      </div>
    );
  }
);

export default Avatar;
