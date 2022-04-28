import * as chrono from 'chrono-node';
import $ from "jquery";
import { copyTextToClipboard } from './clipboard.js';

function epoch(date) {
	return Math.round(date.getTime() / 1000);
}

function formatDate(date) {
	var options = {  weekday: 'long', month: 'long', day: 'numeric', timeZoneName: 'short', hour: 'numeric', minute: 'numeric' };
	
	let formatter = new Intl.DateTimeFormat('en-us', options);
	let parts = formatter.formatToParts(date);
	let out = '';
	
	
	for (let i = 0; i < parts.length-1; i++) {
		out += parts[i]['value'];
	}
	
	out += ' (' + parts[parts.length-1]['value'] + ')';
	
	return out;
}

$("#copy").on('click', function() {
	$("#copy").text("Copied");
	
	setTimeout(() => $("#copy").text("Copy"), 1000);
	
	copyTextToClipboard($("#unix").text());
});


$('#input-form').on('input', function(){
	let parsedDate = chrono.parseDate($("#date-input").val());
	
	if (isNaN(Date.parse(parsedDate))) return; //Invalid date
	
	let epochTimestamp = epoch(parsedDate);
	let format = $("#format").val();
	
	$("#copy").show(); //Remove display: none
	$("#out-date").text(formatDate(parsedDate));
	$("#unix").text('<t:' + epochTimestamp + format + '>');
});