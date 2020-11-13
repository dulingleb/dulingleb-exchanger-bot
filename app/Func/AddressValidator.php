<?php


namespace App\Func;


class AddressValidator
{
    private static function validate($address){
        $decoded = self::decodeBase58($address);

        $d1 = hash("sha256", substr($decoded,0,21), true);
        $d2 = hash("sha256", $d1, true);

        if(substr_compare($decoded, $d2, 21, 4)){
            throw new \Exception("Что-то не похоже на btc адрес!");
        }
        return true;
    }

    private static function decodeBase58($input) {
        $alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

        $out = array_fill(0, 25, 0);
        for($i=0;$i<strlen($input);$i++){
            if(($p=strpos($alphabet, $input[$i]))===false){
                throw new \Exception("Найден некорректный символ в адресе");
            }
            $c = $p;
            for ($j = 25; $j--; ) {
                $c += (int)(58 * $out[$j]);
                $out[$j] = (int)($c % 256);
                $c /= 256;
                $c = (int)$c;
            }
            if($c != 0){
                throw new \Exception("Слишком длинный адрес");
            }
        }

        $result = "";
        foreach($out as $val){
            $result .= chr($val);
        }

        return $result;
    }

    public static function validateBTC ($s) {
        $message = "ok";
        try {
            self::validate($s);
        } catch (\Exception $e) {
            $message = $e->getMessage();
        }

        return $message;
    }
}
