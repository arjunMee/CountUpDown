/*
 * CountUpDown Clock
 * @author Brett Leighton (brettleighton.com)
 * Based on work by Robert Hashemian, Munsifali Rashid, and Tilesh Khatri.
 * You can use this freely as long as I am credited.
 *
 * Method startCount(Div div, Date targetDate, boolean isCountingDown)
 *
 * Examples of use
 *
 * Counts up from the author's birth day.
 * startCount("count", "12/17/1994 11:00 PM -0600", false)
 *
 * Counts down to 2016.
 * startCount("count", "01/01/2016 00:00 AM -0600", true)
 */

 function startCount(div, targetDate, isCountingDown) {
  const oldDate = new Date(targetDate);
 const currentDate = new Date();

  differenceInDate = new Date(isCountingDown ? (oldDate - currentDate) : (currentDate - oldDate));

  secs = Math.floor(differenceInDate.valueOf()/1000);

  countBack(div, secs, isCountingDown);
}

function calcAge(secs, num1, num2) {
  s = ((Math.floor(secs/num1)) % num2).toString();

  if (s.length < 2) { 
    s = "0" + s;
  }
  return (s);
}

function countBack(div, secs, isCountingDown) {
  const displayStr;
  const displayFormat = "%%D%%:%%H%%:%%M%%:%%S%%";

  displayStr = displayFormat.replace(/%%D%%/, calcAge(secs, 86400, 100000));
  displayStr = displayStr.replace(/%%H%%/, calcAge(secs, 3600, 24));
  displayStr = displayStr.replace(/%%M%%/, calcAge(secs, 60, 60));
  displayStr = displayStr.replace(/%%S%%/, calcAge(secs, 1, 60));

  if(secs > 0) {  
    document.getElementById(div).innerHTML = displayStr;

    setTimeout(function(){
      countBack(div, (isCountingDown ? (secs-1) : (secs+1)), isCountingDown);
    }, 990); /*chose 990 as opposed to 1000 to take into account slight processing delay, could optimize*/

  } else {
    document.getElementById(div).innerHTML = "00:00:00:00";
  }
}
