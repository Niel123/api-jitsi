<?php

namespace App\Exports;

use App\AttendanceLog;
use DateTime;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithDrawings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
//use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use DB;

class LoginHistoryExport implements
    ShouldAutoSize,
    WithMapping,
    WithHeadings,
    WithEvents,
    FromQuery,
   // WithDrawings,
    WithCustomStartCell,
    WithTitle
{
    use Exportable;


    private $id;

    public function __construct(string $id)
    {

        $this->id = $id;
    }

    public function query()
    {  
       return  AttendanceLog::where('conference_id',$this->id);
    }

    public function map($list): array
    {
        $attendees = '';
        if($list->students_json){
            $json = json_decode($list->students_json);
            $attendees = implode(", ", $json);
        }
       
        return [
            date("F j, Y, g:i a",strtotime($list->created_at)),
            $attendees,
        ];
    }

    public function headings(): array
    {
        return [
            "Name",
            "Date",
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getStyle('A1:M1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 13,
                    ]
                ]);
            }
        ];
    }

    public function startCell(): string
    {
        return 'A1';
    }

    public function title(): string
    {
        return "Attendance History";
    }
}