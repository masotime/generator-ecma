import { Base } from 'yeoman-generator';
import { join, basename } from 'path';

function askFor(name, { message, choices, filter, _default }) {
	const required = !!_default;
	const type = choices ? 'list' : 'input';

	return {
		type, name, message, required, filter, default: _default
	};
}

export default class Generator extends Base {
	constructor(...args) {
		super(...args);
	}

	_copy(src, dest, model = {}) {
		const sourcePath = this.templatePath(src);
		const targetPath = this.destinationPath(dest);
		
		this.log(`Copying ${sourcePath} => ${targetPath}`);
		this.fs.copyTpl(sourcePath, targetPath, model);
	}

	prompting() {
		const self = this;
		const done = self.async();
		const prompts = [
			askFor('type', {
				message: 'What kind of app are you building?',
				choices: ['cli', 'npm'],
				_default: 'cli',
			}),
			askFor('appname', { message: 'Project name', _default: self.appname}),
			askFor('description', { message: 'Description', _default: 'Your description here'}),
			askFor('author', 'Author', 'Captain Anonymous'),
			askFor('source', 'Source ES2015 folder', 'src')
		];

		self.prompt(prompts, answers => {
			let { appname, description, author, source } = answers;
			self.choices = { appname, description, author, src: source };

			// create the folder if the appname isn't the same as the current folder
			const currentRoot = self.destinationRoot();
			const currentFolder = basename(currentRoot);

			if (currentFolder !== appname) {
				const newRoot = join(currentRoot, appname);
				this.log(`Since the current folder ${currentFolder} isn't the same as the application name ${appname}, ${newRoot} will be created.`);
				self.destinationRoot(newRoot);
			}

			done();
		});
	}

	writing() {
		const self = this;
		const { appname, description, author, src, type } = self.choices;

		const srcmain = join('.', src, 'index.js');
		const srcpath = join('.', src);

		try {
			self._copy(`${type}/**/*`, srcpath, {
				appname, description, author, srcmain, srcpath
			});
			self.fs.move(`${type}/src`, `${type}/${src}`, { author });
		} catch (err) {
			console.error(err.stack);
		}
	}

	install() {
		this.installDependencies();
	}
}
