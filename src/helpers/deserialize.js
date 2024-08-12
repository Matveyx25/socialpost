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
							let newValue = node.value.replace(/\|\|([^|\n]+)\|\|/g, '<span class="spoiler">$1</span>');
							newValue = newValue.replace(/\+\+([^+\n]+)\+\+/g, '<u>$1</u>');

							const newNode = {
									type: 'html',
									value: newValue
							};

							parent.children.splice(index, 1, newNode);
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