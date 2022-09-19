import { compile } from 'handlebars';
import fs from 'fs';
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
		const templateContent = await fs.promises.readFile(template, {
			encoding: 'utf-8',
		});

		const parseTemplate = compile(templateContent);

		return parseTemplate(variables);
	}
}
