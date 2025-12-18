import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/i18n';
import Card from './Card';
import { Profile } from '../../types';
import { dayOfBirthData } from '../../data/talehSaadNahsData';

const PROFILES_STORAGE_KEY = 'celestial_explorer_profiles_v2';

export const useProfiles = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(PROFILES_STORAGE_KEY);
            if (stored) setProfiles(JSON.parse(stored));
        } catch (error) {
            console.error("Failed to load profiles", error);
        }
    }, []);

    const saveProfiles = (updatedProfiles: Profile[]) => {
        try {
            localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
            setProfiles(updatedProfiles);
        } catch (error) {
            console.error("Failed to save profiles", error);
        }
    };

    const saveProfile = (profileData: Omit<Profile, 'id'>, id?: string): Profile => {
        if (id) { // Update
            const updatedProfiles = profiles.map(p => p.id === id ? { ...p, ...profileData } : p);
            saveProfiles(updatedProfiles);
            return { ...profileData, id };
        } else { // Create
            const newProfile = { ...profileData, id: new Date().toISOString() };
            saveProfiles([...profiles, newProfile]);
            return newProfile;
        }
    };

    const deleteProfile = (id: string) => {
        saveProfiles(profiles.filter(p => p.id !== id));
    };

    return { profiles, saveProfile, deleteProfile };
};


interface ProfileManagerProps {
  onProfileChange: (profile: Profile | null) => void;
  profiles: Profile[];
  saveProfile: (profileData: Omit<Profile, 'id'>, id?: string) => Profile;
  deleteProfile: (id: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ onProfileChange, profiles, saveProfile, deleteProfile }) => {
    const { t } = useTranslation();
    const [selectedId, setSelectedId] = useState<string>('new');
    const [formData, setFormData] = useState<Omit<Profile, 'id'>>({
        name: '', motherName: '', birthDate: '', birthTime: '', birthCity: '', birthDayOfWeek: ''
    });

    useEffect(() => {
        const selectedProfile = profiles.find(p => p.id === selectedId);
        if (selectedProfile) {
            setFormData(selectedProfile);
            onProfileChange(selectedProfile);
        } else {
            const newProfileData = { name: '', motherName: '', birthDate: '', birthTime: '', birthCity: '', birthDayOfWeek: '' };
            setFormData(newProfileData);
            onProfileChange(null);
        }
    }, [selectedId, profiles, onProfileChange]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(e.target.value);
    };

    const handleSave = () => {
        if (!formData.name || !formData.motherName) return;
        const savedProfile = saveProfile(formData, selectedId !== 'new' ? selectedId : undefined);
        setSelectedId(savedProfile.id);
    };

    const handleDelete = () => {
        if (selectedId !== 'new') {
            deleteProfile(selectedId);
            setSelectedId('new');
        }
    };

    const isFormDirty = () => {
        if (selectedId === 'new') {
            return Object.values(formData).some(val => val !== '');
        }
        const selectedProfile = profiles.find(p => p.id === selectedId);
        if (!selectedProfile) return false;
        // Create a comparable object from selectedProfile
        const comparableProfile = {
            name: selectedProfile.name,
            motherName: selectedProfile.motherName,
            birthDate: selectedProfile.birthDate,
            birthTime: selectedProfile.birthTime,
            birthCity: selectedProfile.birthCity,
            birthDayOfWeek: selectedProfile.birthDayOfWeek || ''
        };
        return JSON.stringify(formData) !== JSON.stringify(comparableProfile);
    };

    return (
        <Card>
            <h4 className="text-2xl font-lalezar text-center text-indigo-300 mb-4">{t('profile_manager_title')}</h4>
            <p className="font-tanha text-gray-400 text-center mb-6">{t('profile_manager_desc')}</p>
            <div className="space-y-4">
                <select 
                    value={selectedId} 
                    onChange={handleSelectChange}
                    className="w-full bg-slate-800/60 border border-slate-600 text-white text-lg rounded-lg p-3"
                    aria-label={t('select_profile_label')}
                >
                    <option value="new">{t('new_profile_option')}</option>
                    {profiles.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({t('child_of')} {p.motherName})</option>
                    ))}
                </select>

                <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3" />
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} placeholder={t('mother_name_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3" />
                </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" name="birthDate" value={formData.birthDate} onChange={handleInputChange} placeholder={t('profile_birthdate_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3" />
                    <select name="birthDayOfWeek" value={formData.birthDayOfWeek} onChange={handleInputChange} className="w-full bg-slate-800/50 border-slate-600 rounded p-3">
                        <option value="">{t('profile_birth_day_of_week')}</option>
                        {dayOfBirthData.map((day, index) => <option key={day.key} value={index}>{t(`day_of_birth_${day.key}_day`)}</option>)}
                    </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" name="birthTime" value={formData.birthTime} onChange={handleInputChange} placeholder={t('profile_birthtime_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3" />
                    <input type="text" name="birthCity" value={formData.birthCity} onChange={handleInputChange} placeholder={t('profile_birthcity_placeholder')} className="w-full bg-slate-800/50 border-slate-600 rounded p-3" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        onClick={handleSave}
                        disabled={!formData.name || !formData.motherName || !isFormDirty()}
                        className="flex-grow bg-green-600 hover:bg-green-500 disabled:bg-gray-600/50 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        {selectedId === 'new' ? t('save_profile_button') : t('update_profile_button')}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={selectedId === 'new'}
                        className="flex-grow bg-red-600 hover:bg-red-500 disabled:bg-gray-600/50 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        {t('delete_profile_button')}
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default ProfileManager;