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
    boolean header = true;
    
    //Key: asset name; Value: List of pairs <date, price>
    private Map<String, List<Pair<String, String>>> result = new HashMap<>();
    
    private void exec (String input, String output)
        throws IOException
    {
        //Process the stream skipping the header
         Files.lines(Paths.get(input)).forEach(line -> process(line));
        
        //Output to file
        writeToFile(output);
    }
    
    private void process(String line)
    {   
        if (header)
        {
            assetNames = line.split(","); //Use this as look up maps
        
            //Init the map
            for (int i = 1; i < assetNames.length; ++i)
                result.put(assetNames[i], new ArrayList<Pair<String, String>>());
            
            header = false;
        
        }
        else
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
    
    private void writeToFile(String output)
            throws IOException
    {
        List<String> lines = new ArrayList<>();
        String assetName;
        
        lines.add("var asset_price_dataset = [\n");
        String metaFmt = "{\n"
                        + "\t\"className\": \".%s\",\n"
                        + "\t\"asset\": \"%s\",\n"
                        + "\t\"data\": [\n";
        
        String pairFmt = "\t\t{ \"x\": \"%s\", \"y\": %s },\n";
        
        //For ea asset
        for (Map.Entry<String, List<Pair<String, String>>> entry : result.entrySet())
        {
            assetName = entry.getKey();
            lines.add(String.format(metaFmt, assetName, assetName));
            
            //For ea price entry:
            for (Pair<String, String> price : entry.getValue())
                lines.add(String.format(pairFmt, price.date, price.price));
            
            //Closing parens + brackets
            lines.add("]\n},\n");
        }
        
        lines.add("];\n");
        Files.write(Paths.get(output), lines);
    }
	
}