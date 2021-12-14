<?php

namespace App\Http\Controllers;

use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Illuminate\Http\Request;
use App\Exports\UserMultiSheetExport;
use DB;
use Auth;
use App\Attendance;


class ExportController extends Controller
{

    private $excel;
    public function __construct(Excel $excel) 
    {
       $this->excel = $excel;
    }


    public function exportMultiple(Request $request)
    {
       
        $decode_id =  base64_decode($request->id);
		if(!$decode_id)
        {
            abort(4404, 'Page not found!');
        }
        //return  Attendance::where('conference_id',$decode_id)->orderBy('last_attendance','desc')->groupBy('name')->get();
       return Excel::download(new UserMultiSheetExport($decode_id), 'attendance-export.xlsx');
    }

    
        
    
    
    
}

