<?php

/**
 * 这是PHP操作Excel的扩展 
 * 这里只有扩展必须的文件，如果想看文档，请点下面的链接：
 *    
 *    官方仓库： https://github.com/PHPOffice/PHPExcel
 *  
 */



if (PHP_SAPI == 'cli')
  die('这个php只能通过浏览器访问！');
  
require_once dirname(__FILE__) . '/PHPExcel/PHPExcel.php';
require_once dirname(__FILE__) . '/DB.class.php';

function browser_output_xls($objExcel, $filename = '01simple'){
    // Redirect output to a client’s web browser (Excel5)
  header('Content-Type: application/vnd.ms-excel');
  header("Content-Disposition: attachment;filename='$filename.xls'");
  header('Cache-Control: max-age=0');
  // If you're serving to IE 9, then the following may be needed
  header('Cache-Control: max-age=1');

  // If you're serving to IE over SSL, then the following may be needed
  header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
  header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
  header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
  header ('Pragma: public'); // HTTP/1.0

  $objWriter = PHPExcel_IOFactory::createWriter($objExcel, 'Excel5');
  $objWriter->save('php://output');
}

function browser_output_xlxs($objExcel, $filename = '01simple'){
  // Redirect output to a client’s web browser (Excel2007)
  header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  header("Content-Disposition: attachment;filename='$filename.xlsx'");
  header('Cache-Control: max-age=0');
  // If you're serving to IE 9, then the following may be needed
  header('Cache-Control: max-age=1');

  // If you're serving to IE over SSL, then the following may be needed
  header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
  header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
  header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
  header ('Pragma: public'); // HTTP/1.0

  $objWriter = PHPExcel_IOFactory::createWriter($objExcel, 'Excel2007');
  $objWriter->save('php://output');
}


// 初始化Excel对象
$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A1', 'id')
            ->setCellValue('B1', 'user_id')
            ->setCellValue('C1', 'prescription_id')
            ->setCellValue('D1', 'prescription_info')
            ->setCellValue('E1', 'prescription_type');
$objPHPExcel->getActiveSheet()->setTitle('工单管理系统');

// 连接数据库，获取对应的内容
$db = DB::getStringleton('localhost', 'menzhen', 'root', '123456');
$result = $db->select("prescription");
$db->__destruct();

// 循环输出表的内容到excel中
for ($i=0; $i < count($result); $i++) { 
  $index = $i+2;
  $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue("A$index", $result[$i]["id"])
            ->setCellValue("B$index", $result[$i]["user_id"])
            ->setCellValue("C$index", $result[$i]["prescription_id"])
            ->setCellValue("D$index", $result[$i]["prescription_type"])
            ->setCellValue("E$index", $result[$i]["prescription_info"]);
}

// 设置第一张表为活动表
$objPHPExcel->setActiveSheetIndex(0);

browser_output_xlxs($objPHPExcel, '工单管理系统');
exit;