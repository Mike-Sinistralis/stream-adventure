var through = require('through2'),
	split = require('split'),
	stream = through(write, end),
	isLowerCase = true;

process.stdin.pipe(split()).pipe(stream).pipe(process.stdout);

function write(buffer, encoding, next)
{
	if(isLowerCase)
	{
		this.push(buffer.toString().toLowerCase());
		isLowerCase = false;
	}
	else
	{
		this.push(buffer.toString().toUpperCase());
		isLowerCase = true;
	}
	this.push('\n');
	next();
}

function end(done) 
{
	done();
}