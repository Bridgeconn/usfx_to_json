var fs = require('fs');

var et = require('elementtree');

var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

var data, etree;
var res = {};
data = fs.readFileSync('./data/test.xml').toString();
etree = et.parse(data);
books_var = etree.findall('book');
res.langCode = etree.find('languageCode').text;
res.books = [];
books_var.forEach(function(book, index, array) {

  val = book.findall('p');
  toc_val = book.findall('toc');
  temp = {};

  temp.toc = [];

  toc_val.forEach(function(toc, i, varr) {
  	tl = {};
  	tl = toc.attrib;
  	tl.text = toc.text;
  	temp.toc.push(tl);
    });

  temp.name = book.attrib.id;
  temp.chapters = [];
  c_counter = 0;
  var ch = {}

  val.forEach(function(p, i, arr) {
    if(p._children.length > 0) {
      p._children.forEach(function(v, i, varr) {
        if(v.tag == 'v') {
          t = v.attrib.bcv.split('.');
          if(c_counter != t[1]) {
            ch[parseInt(t[1])] = {};
            c_counter = t[1];
          }
          ch[parseInt(t[1])][parseInt(t[2])] = v.tail.replace(/^\s+|\s+$/g, '');
        }
      });
    }
  });
  temp.chapters.push(ch);
  res.books.push(temp);
});
console.log(res);

module.exports = convertor;
/*
console.log(etree.findall('./entry/TenantId').length); // 2
console.log(etree.findtext('./entry/ServiceName')); // MaaS
console.log(etree.findall('./entry/category')[0].get('term')); // monitoring.entity.create
console.log(etree.findall('/category/[@term="monitoring.entity.update"]').length); // 1
*/
