import * as React from 'react';
import { Badge } from 'src/components/Badges';
import { TextLink } from 'src/components/Button';

const classes = {
  inputStyle:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300',
  titleStyle: 'font-sans text-gray-700 text-2xl md:text-3xl text-primary',
};

type InputProps = {
  value: string;
};

export const Input: JSX.Element = (props) => {
  return <input type="text" className={classes.inputStyle} {...props} />;
};

type TitleProps = {
  value: string;
};

export const Title: JSX.Element = (props: TitleProps) => {
  return <h1 className={classes.titleStyle}>{props.value}</h1>;
};

export const Tag: JSX.Element = (props) => {
  return <div></div>;
};

type PostTitleProps = {
  name: string;
  date: string;
  href: string;
  title: string;
};

export const PostTitle: JSX.Element = (props: PostTitleProps) => {
  return (
    <div className="pb-4 py-1">
      <div className="flex border-2 border-yellow-500 flex-row items-center">
        <Badge size="small" shape="large" type="workspace" name={"K. International School Tokyo"} />
        <Badge size="small" shape="circle" type="subspace" name={"IB MATH HL"} />
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
  title: string;
  inputProps: InputProps;
};

export const TitleInput: JSX.Element = (props) => {
  return (
    <>
      <Title value={props.title} />
      <Input {...props.inputProps} />
    </>
  );
};
