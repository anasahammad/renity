import { useEffect, useState } from 'react';
import { FiTag } from 'react-icons/fi';
import axiosInstance from '../../hooks/axiosInstance';

const RentalItemMetaData = ({ category, rentalId }) => {
  const [metaArrs, setMetaArrs] = useState([]);

  const addMetaObj = (key, value) => {
    if (metaArrs.some((item) => item.key === key)) {
      const updatedMetaArrs = metaArrs.map((item) => (item.key === key ? { key, value } : item));
      setMetaArrs(updatedMetaArrs);
      return;
    }
    setMetaArrs([...metaArrs, { key, value }]);
  };
  useEffect(() => {
    if (rentalId) {
      const result = metaArrs.map((item) => ({ ...item, entity: rentalId }));
      setMetaArrs(result);
      Promise.all(
        result.map(async (item) => {
          await axiosInstance.post('/metadata/rentalitem', item);
          setMetaArrs([]);
          document.querySelectorAll('input').forEach((input) => (input.value = ''));
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentalId]);

  useEffect(() => {
    document.querySelectorAll('input').forEach((input) => (input.value = ''));
    setMetaArrs([]);
  }, [category]);

  return (
    <>
      {category === 'ইলেকট্রনিক্স' && (
        <div className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='brand'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্র্যান্ড
              </label>
              <div className='mt-1'>
                <input
                  id='brand'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Brand', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='model_name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মডেল নম্বর
              </label>
              <div className='mt-1'>
                <input
                  id='model_name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Model Name', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='special_feature'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                বিশেষ বৈশিষ্ট্য
              </label>
              <div className='mt-1'>
                <input
                  id='special_feature'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Special Feature', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='color'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                রং
              </label>
              <div className='mt-1'>
                <input
                  id='color'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Color', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='weight'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ওজন
              </label>
              <div className='mt-1'>
                <input
                  id='weight'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Weight', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='power_consumption'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                বিদ্যুৎ খরচ
              </label>
              <div className='mt-1'>
                <input
                  id='power_consumption'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Power Consumption', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='battery_capacity'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যাটারি ক্ষমতা
              </label>
              <div className='mt-1'>
                <input
                  id='battery_capacity'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Battery Capacity', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='dimension'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাত্রা
              </label>
              <div className='mt-1'>
                <input
                  id='dimension'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Dimension', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='stock_status'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                স্টক অবস্থা
              </label>
              <div className='mt-1'>
                <input
                  id='stock_status'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Stock Status', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'গৃহস্থালি যন্ত্রপাতি' && (
        <div className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের উদ্দেশ্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Purpose', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                প্রধান বৈশিষ্ট্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Main Feature', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                সামগ্রী
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Material', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাপ বা আকার
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Size', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ওজন
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Weight', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ক্ষমতা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Capacity', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের নির্দেশনা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Instruction', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাত্রা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Quantity', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                স্টক অবস্থা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Stock Status', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'আসবাবপত্র' && (
        <div className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের উদ্দেশ্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Purpose', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                প্রধান বৈশিষ্ট্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Main Feature', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                সামগ্রী
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Material', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাপ বা আকার
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Size', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ওজন
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Weight', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ক্ষমতা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Capacity', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের নির্দেশনা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Instruction', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাত্রা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Quantity', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                স্টক অবস্থা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Stock Status', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'চলচ্চিত্র ও ফটোগ্রাফি' && (
        <div className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='brand'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্র্যান্ড
              </label>
              <div className='mt-1'>
                <input
                  id='brand'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Brand', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='model_name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মডেল নম্বর
              </label>
              <div className='mt-1'>
                <input
                  id='model_name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Model Name', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='special_feature'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                বিশেষ বৈশিষ্ট্য
              </label>
              <div className='mt-1'>
                <input
                  id='special_feature'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Special Feature', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='color'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                রং
              </label>
              <div className='mt-1'>
                <input
                  id='color'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Color', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='weight'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ওজন
              </label>
              <div className='mt-1'>
                <input
                  id='weight'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Weight', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='power_consumption'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                বিদ্যুৎ খরচ
              </label>
              <div className='mt-1'>
                <input
                  id='power_consumption'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Power Consumption', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='battery_capacity'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যাটারি ক্ষমতা
              </label>
              <div className='mt-1'>
                <input
                  id='battery_capacity'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Battery Capacity', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='dimension'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাত্রা
              </label>
              <div className='mt-1'>
                <input
                  id='dimension'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Dimension', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='stock_status'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                স্টক অবস্থা
              </label>
              <div className='mt-1'>
                <input
                  id='stock_status'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Stock Status', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'যন্ত্রপাতি ও সরঞ্জাম' && (
        <div className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের উদ্দেশ্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Purpose', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                প্রধান বৈশিষ্ট্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Main Feature', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                সামগ্রী
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Material', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাপ বা আকার
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Size', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ওজন
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Weight', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ক্ষমতা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Capacity', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের নির্দেশনা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Instruction', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাত্রা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Quantity', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                স্টক অবস্থা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Stock Status', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {category === 'কৃষি ও নির্মাণ যন্ত্রপাতি' && (
        <div className='space-y-5'>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের উদ্দেশ্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Purpose', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                প্রধান বৈশিষ্ট্য
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Main Feature', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                সামগ্রী
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Material', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাপ বা আকার
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Size', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ওজন
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Weight', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ক্ষমতা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Capacity', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                ব্যবহারের নির্দেশনা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Instruction', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                মাত্রা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Quantity', e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                <FiTag className='inline-block mr-2' />
                স্টক অবস্থা
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                  onChange={(e) => addMetaObj('Stock Status', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RentalItemMetaData;
