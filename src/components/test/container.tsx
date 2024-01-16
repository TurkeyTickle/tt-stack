function Container(props: React.HTMLAttributes<HTMLDivElement>) {
    return (<div className="border-2 rounded-md p-2">{props.children}</div> );
}

export default Container;