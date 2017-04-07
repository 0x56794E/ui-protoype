import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.io.File;

import java.util.stream.Stream;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
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
    private static class Pair<K, V>
    {
        public final K date;
        public final V price;
        
        public Pair(K date, V price)
        {
            this.date = date;
            this.price = price;
        }
    }
    
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
    
    //HashMap spec the assets 
    //and their corresp column idx
    //Key == array idx; Val == val
    String[] assetNames;
    
    //Key: asset name; Value: List of pairs <date, price>
    private Map<String, List<Pair<String, String>>> result = new HashMap<>();
    
    private void exec (String input, String output)
        throws IOException
    {
        Stream<String> lines = Files.lines(Paths.get(input));
        
        //Read the header
        Optional<String> headerOpt = lines.findFirst();
        
        if (!headerOpt.isPresent())
            throw new IllegalArgumentException("Invalid file format");
        
        String header = headerOpt.get();
        assetNames = header.split(","); //Use this as look up maps
        
        //Init the map
        for (int i = 1; i < assetNames.length; ++i)
            result.put(assetNames[i], new ArrayList<Pair<String, String>>());
        
        //Process the stream skipping the header
        lines.skip(1).forEach(line -> process(line));
    }

    private void process(String line)
    {
        //Format: <date> <price for stock 0> <prc for stock 1> ... <price for stock n>
        String toks[] = line.split(",");
        String date = toks[0];
        
        for (int i = 1; i < toks.length; ++i)
        {
            result.get(assetNames[i]).add(new Pair<String, String>(date, toks[i]));
        }
        
        
    }
	
}