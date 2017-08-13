/**
 * lcm: Least Common Multiple，最小公倍数
 * 两数乘积除以两数的最大公因数
 * @param {Object} n1
 * @param {Object} n2
 */
function lcm(n1, n2) {
	n1.toString();
	n2.toString();
	return(n1 * n2) / gcf(n1, n2);
}

/*
 * gcf:the greatest common factor
 * 辗转相除法求最大公因数
 */
function gcf(n1, n2) {
	return n2 == 0 ? n1 : gcf(n2, n1 % n2);
}
/*
 * 小数转分数。一定要输入小数点
 */
function xiao2fen(val) {
	var valStr = val.toString();
	var xiaoshu;
	var len;
	var fenzi;
	if(valStr.indexOf('.') != -1) {
		xiaoshu = valStr.split('.');
		//console.log(xiaoshu+' - '+valStr+'='+xiaoshu[1]+'indexOf(.):'+valStr.indexOf('.'))
		len = xiaoshu[1].length;
		fenzi = xiaoshu[0] + xiaoshu[1];
	} else { //没有小数点
		xiaoshu = valStr;
		len = 0;
		fenzi = xiaoshu[0];
	}

	var fenmu = Math.pow(10, len);
	var first = fenzi - fenmu > 0 ? fenzi : fenmu;
	var second = fenzi - fenmu < 0 ? fenzi : fenmu;
	var gc = gcf(first, second);
	return(fenzi /= gc) + '/' + (fenmu /= gc);
}
/*
 * 分数转小数
 */
function fen2xiao(val) {
	var valStr = val.toString();
	var fenshu = valStr.split('/');
	return parseInt(fenshu[0]) / parseInt(fenshu[1]);
}

/*
 * 小数去尾巴
 * val:小数
 * num:保留的位数
 * return float
 */
function trimFloat(val, num) {
	var valStr = val.toString();
	var re = valStr.substr(0, valStr.indexOf('.') + num + 1);
	return parseFloat(re)
}

/**
 * 四舍五入
 * toFixed(2)
 */

/**
 * 分数相加，通分
 * @param {Object} n1
 * @param {Object} n2
 */
function fenPlusOrMinus(op,n1, n2) {
	var n1d = n1.split('/');
	var n2d = n2.split('/');
	var n1fenzi = n1d[0];
	var n1fenmu = n1d[1];
	var n2fenzi = n2d[0];
	var n2fenmu = n2d[1];
	var lc = lcm(n1fenmu, n2fenmu);
	var resultFenzi;
	if(op=='+'){//分数加法
		resultFenzi = n1fenzi * (lc/n1fenmu) + n2fenzi * (lc/n2fenmu);
	}else if(op=='-'){//分数乘法
		resultFenzi = n1fenzi * (lc/n1fenmu) - n2fenzi * (lc/n2fenmu);
	}
	return simplfy1(simplfy(resultFenzi,lc))
}

/**
 * 分数乘法
 * @param {Object} n1
 * @param {Object} n2
 */
function fenMutl(n1,n2){
	var n1d = n1.split('/');
	var n2d = n2.split('/');
	var n1fenzi = n1d[0];
	var n1fenmu = n1d[1];
	var n2fenzi = n2d[0];
	var n2fenmu = n2d[1];
	return simplfy1(simplfy(n1fenzi * n2fenzi,n1fenmu * n2fenmu));
}

function fenDivid(n1,n2){
	var n1d = n1.split('/');
	var n2d = n2.split('/');
	var n1fenzi = n1d[0];
	var n1fenmu = n1d[1];
	var n2fenzi = n2d[0];
	var n2fenmu = n2d[1];
	return simplfy1(simplfy(n1fenzi * n2fenmu,n1fenmu * n2fenzi));
}
/**
 * 约分
 * @param {Object} fenzi
 * @param {Object} fenmu
 */
function simplfy(fenzi,fenmu){
	var gcd = gcf(fenzi,fenmu);
	return (fenzi /= gcd) + '/' + (fenmu /= gcd);
}

/**
 * 简化分母是1的结果
 * @param {Object} a
 */
function simplfy1(a){
	var temp = a.split('/');
	if(temp[1] == 1){
		return temp[0];
	}else{
		return a;
	}
}
