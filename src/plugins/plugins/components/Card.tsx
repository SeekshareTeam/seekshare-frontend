import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

const styles = {
  container: 'relative bg-inherit mt-2',
  card: 'rounded p-2 bg-neutral-800',
  toolbar:
    'absolute top-0 right-2 left-2 -translate-y-1/2 flex flex-row space-x-2',
  componentType: 'rounded-full px-2 py-1 bg-neutral-700',
  componentTypeText: 'text-white text-xs',
  tagButton:
    'rounded-full bg-neutral-700 h-6 w-6 flex items-center justify-center',
  tagIcon: 'fa fa-regular fa-tag dark:text-white',
};

const Card: React.FC<Props> = props => {
  const { className, ...rest } = props;

  let cn = styles.card;

  if (className) {
    cn = `${cn} ${className}`;
  }

  return (
    <div className={styles.container}>
      <div className={cn} {...rest} />
      <div className={styles.toolbar}>
        <div className={styles.componentType}>
          <p className={styles.componentTypeText}>{props.title}</p>
        </div>
        <div className={styles.tagButton}>
          <i className={styles.tagIcon} />
        </div>
      </div>
    </div>
  );
};

export default Card;
