let count = 0;

document.getElementById("decr").onclick = function() {
    count -= 1;
    document.getElementById("counter").innerHTML = count;
}
document.getElementById("rs").onclick = function() {
    count = 0;
    document.getElementById("counter").innerHTML = count;
}
document.getElementById("incr").onclick = function() {
    count += 1;
    document.getElementById("counter").innerHTML = count;
}