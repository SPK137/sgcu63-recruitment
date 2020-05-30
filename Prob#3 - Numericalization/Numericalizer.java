import java.util.Scanner;

class Numericalizer {

	private static int[][][] numberPattern = { { {1,1,1,1,1}, {0,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,1,1,1,1} },
											   { {1,0,0,0,1}, {0,0,0,0,1}, {0,0,0,0,1}, {0,0,0,0,1}, {1,0,0,0,1}, {1,0,0,0,0}, {1,0,0,0,0}, {0,0,0,0,1}, {1,0,0,0,1}, {1,0,0,0,1} },
											   { {1,0,0,0,1}, {0,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,1,1,1,1}, {1,1,1,1,1}, {0,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1} },
											   { {1,0,0,0,1}, {0,0,0,0,1}, {1,0,0,0,0}, {0,0,0,0,1}, {0,0,0,0,1}, {0,0,0,0,1}, {1,0,0,0,1}, {0,0,0,0,1}, {1,0,0,0,1}, {0,0,0,0,1} },
											   { {1,1,1,1,1}, {0,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1}, {0,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1}, {0,0,0,0,1}, {1,1,1,1,1}, {1,1,1,1,1} }};

	public static void main(String[] args){
		var scanner = new Scanner(System.in);
		int input = scanner.nextInt();
		int numberHeight = scanner.nextInt();
		int numberWidth = scanner.nextInt();
		String inputString = ""+input;
		for(int row=0 ; row < 5*numberHeight  ; row++){
			for(int index=0 ; index < inputString.length() ; index++){
				for(int col=0 ; col < 5*numberWidth  ; col++){
					if(numberPattern[ row/numberHeight ][ (inputString.charAt(index)) - '0' ][ col/numberWidth ] == 1)
						System.out.print(inputString.charAt(index));
					else
						System.out.print(" ");
				}
				if(index < inputString.length()-1){
					for(int spacing=0 ; spacing<numberWidth ; spacing++)
						System.out.print(" ");
				}
			}
			System.out.println();
		}
	}
}