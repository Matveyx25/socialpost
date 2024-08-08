import { Spoiler } from 'react-spoiler-tag';
import { visit } from 'unist-util-visit';

function isSpoilers(string) {
  const regex = /\|\|[^|\n]+\|\|/g;
  
  return regex.test(string);
}

function isUnderline(string) {
  const regex = /\+\+[^|\n]+\+\+/g;
  
  return regex.test(string);
}

export function deserializeToHTML() {
	return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if(isSpoilers(node.value) || isUnderline(node.value)){
				const parts = node.value.split(' ')
				
				parts.forEach((part, partIndex) => {
					const trimmedPart = part.trim();

					if (/^\|\|/i.test(trimmedPart)) {
						const newNode = {
								type: 'html', 
								value: `<span className="spoiler">${trimmedPart.replaceAll('||', '') }</span>`
						};
						parent.children.splice(index, 1, newNode);
						index += 1;
					}else if (/^\+\+/i.test(trimmedPart)) {
						const newNode = {
								type: 'html', 
								value: `<u>${trimmedPart.replaceAll('++', '') }</u>`
						};
						parent.children.splice(index, 1, newNode);
						index += 1;
					}
					else {
						parent.children.splice(index + partIndex, 0, {
							type: 'text',
							value: trimmedPart === '' ? ' ' : trimmedPart,
						});
						index += 1;
					}
				})
			}
    });
  };
}

function underlinePlugin() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if(isSpoilers(node.value) || isUnderline(node.value)){
				const parts = node.value.split(' ')
				
				parts.forEach((part, partIndex) => {
					const trimmedPart = part.trim();

					if (/^\|\|/i.test(trimmedPart)) {
						const newNode = {
							type: 'spoiler',
							children: [{ type: 'text', value: trimmedPart.replaceAll('||', '')}],
						};
						parent.children.splice(index, 1, newNode);
						index += 1;
					}else if (/^\+\+/i.test(trimmedPart)) {
						const newNode = {
							type: 'underline',
							children: [{ type: 'text', value: trimmedPart.replaceAll('++', '') }],
						};
						parent.children.splice(index, 1, newNode);
						index += 1;
					}
					else {
						parent.children.splice(index + partIndex, 0, {
							type: 'text',
							value: trimmedPart === '' ? ' ' : trimmedPart,
						});
						index += 1;
					}
				})
			}
    });
  };
}

export default underlinePlugin;