<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->enum('type',['cash','webmoney']);
            $table->bigInteger('appointment_id');
            $table->bigInteger('LMI_SYS_INVS_NO')->nullable();
            $table->bigInteger('LMI_SYS_TRANS_NO')->nullable();
            $table->enum('status',['success','error','pending'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
