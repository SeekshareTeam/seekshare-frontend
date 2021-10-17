

export default function ChildElement({ title, toggle }) {
  return (
    <a className={"block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-200"}>
      {title}
    </a>
  )
};
