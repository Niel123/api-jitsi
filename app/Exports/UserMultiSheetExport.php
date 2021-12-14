<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Exports\AttendanceExport;
use App\Exports\AttendaceHistoryExport;

class UserMultiSheetExport implements WithMultipleSheets
{
    private $id;

    public function __construct(int $id)
    { 
        $this->id = $id;
    }

    public function sheets(): array
    { 
        $sheets = [];
        $sheets[] = new AttendanceExport($this->id);
        $sheets[] = new AttendaceHistoryExport($this->id);
        // $sheets[] = new AttendanceExport($this->id);
        return $sheets;
    }
}