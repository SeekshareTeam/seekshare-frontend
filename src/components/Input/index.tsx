import * as React from 'react';
import clsx from 'clsx'
import { Badge } from 'src/components/Badges';
import { TextLink } from 'src/components/Button';

const classes = {
  inputStyle:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300',
  titleStyle: 'font-sans text-gray-700 text-2xl md:text-3xl text-primary',
  title:
    'appearance-none focus:outline-none leading-tight px-4 py-2 dark:bg-slate-900 dark:caret-white dark:text-white placeholder:text-darkpen-dark',
};

// type InputProps = {
//   value: string;
// };

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props: InputProps) => {
  return <input type="text" className={classes.inputStyle} {...props} />;
};

type TitleProps = {
  value: string;
};

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
  return <h1 className={classes.titleStyle}>{props.value}</h1>;
};

type CommentDetailType = {
  normalText: string;
  linkText: string;
  date: string;
  href: string;
};

type CommentDetailProps = {
  details: CommentDetailType[];
};

export const CommentDetail: React.FC<CommentDetailProps> = (
  props: CommentDetailProps
) => {
  return (
    <div>
      {props.details.map((detail, ix) => (
        <TextLink
          key={ix.toString()}
          normalText={detail.normalText}
          linkText={detail.linkText}
          href={detail.href}
        />
      ))}
    </div>
  );
};

type PostTitleProps = {
  name: string;
  date: string;
  href: string;
  title: string;
};

export const PostTitle: React.FC<PostTitleProps> = (props: PostTitleProps) => {
  return (
    <div className="pb-4 py-1">
      <div className="flex border-2 border-yellow-500 flex-row items-center">
        <Badge
          size="small"
          shape="large"
          type="workspace"
          text={'K. International School Tokyo'}
        />
        <Badge
          size="small"
          shape="circle"
          type="subspace"
          text={'IB MATH HL'}
        />
        <TextLink
          normalText={'Posted by'}
          linkText={props.name}
          href={props.href}
        />
        <TextLink normalText={'Created At'} linkText={props.date} href={''} />
      </div>
      <Title value={props.title} />
    </div>
  );
};

/**
 * title: string
 */
type TitleInputProps = {
  title?: string;
  inputProps: InputProps;
};

export const TitleInput: React.FC<TitleInputProps> = (
  props: TitleInputProps
) => {
  return (
    <>
      {/*<Title value={props.title} />*/}
      <input
        style={{ fontFamily: 'Jetbrains Mono' }}
        {...props.inputProps}
        className={clsx(classes.title, props.inputProps.className)}
      />
    </>
  );
};
