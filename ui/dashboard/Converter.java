import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.io.File;

import java.util.stream.Stream;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;
import java.util.Optional;

/**
 * Convert CSV file to js array of data 
 * (See smaple output format in summary.js)
 * 
 * Input: prices of different assets (Google, Apple, etc stocks and other asset classes)
 * in certain period.
 *
 * @author Vy Thuy Nguyen
 */
public class Converter
{
	/**
	 * Cmd input: <input file path> <output file path>
	 */
	public static void main (String[] args)
        throws Exception
	{
		if (args.length < 2)
		{
			System.out.println("Usage: java Coverter <input file path> <output file path>");
			System.exit(1);
		}
	
        Converter converter = new Converter();
        converter.exec(args[0], args[1]);
	}
    
    
    private void exec (String input, String output)
        throws IOException
    {
        Stream<String> lines = Files.lines(Paths.get(input));
        
        //Read the header
        Optional<String> header = lines.findFirst();
        
        //Process the rest
        lines.forEach(line -> process(line));        
    }

    private void process(String line)
    {
        
    }
	
}