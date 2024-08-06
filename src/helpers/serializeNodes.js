import { Node, Text } from "slate";

export const serializeNodes = (node) => {
	if (Text.isText(node)) {
		let string = Node.string(node)
		if(!string){
			return string
		}
		if (node.strong) {
			string = `**${string}**`
		}
		if (node.emphasis){
			string = `*${string}*`
		}
		if(node.underline){
			string = `<u>${string}</u>`
		}
		if(node.strikeThrough){
			string = `~~${string}~~`
		}
		
		return string
	}

	const children = node.children?.map(n => serializeNodes(n)).join('')

	switch (node.type) {
		case 'link':
			const url = node.link;
			return `[${children}](${url})`;
		default:
			return children
	}
}