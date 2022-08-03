<p>
	 Hover <span class="tooltip" tooltip-data="Tooltip Content">Here</span> to see the tooltip.
</p>
<p>
	 You can also hover <span class="tooltip" tooltip-data="This is another Tooltip Content">here</span> to see another example.
</p>

.tooltip {
	position:relative;
	border-bottom:1px dotted black;
	cursor:pointer;
	text-align:justify;
	word-break:break-all;
}
.tooltip::before {
	content:attr(tooltip-data);
	position:absolute;
	width:200px;
	background-color:#062b45;
	color:#fff;
	padding:6px 8px;
	line-height:1.2;
	border-radius:4px;
	z-index:1;
	opacity:0;
	transition:opacity 0.5s;
	top:125%;
	left:50%;
	margin-left:-60px;
	font-size:0.8em;
	visibility:hidden;
}
.tooltip::after {
	content:"";
	position:absolute;
	top:75%;
	left:50%;
	margin-left:-5px;
	border-width:5px;
	border-style:solid;
	border-color:transparent transparent #062b45 transparent;
	transition:opacity 0.5s;
	opacity:0;
	visibility:hidden;
}
.tooltip:hover::before,.tooltip:hover::after {
	opacity:1;
	visibility: visible;
}
