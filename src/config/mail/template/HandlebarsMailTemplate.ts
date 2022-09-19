import { compile } from 'handlebars';

interface ITemplateVariable {
	[key: string]: string | number;
}

export interface IParseMailTemplate {
	template: string;
	variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
	public async parse({
		template,
		variables,
	}: IParseMailTemplate): Promise<string> {
		const parseTemplate = compile(template);

		return parseTemplate(variables);
	}
}
